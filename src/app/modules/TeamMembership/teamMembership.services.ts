import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import config from '../../config';
import AppError from '../../errors/AppError';
import {
  sendClientAccountConfirmationEmail,
  sendCustomMembershipPaymentEmail,
} from '../../utils/email';
import { generateRandomPassword } from '../../utils/generateRandomPassword';
import { User } from '../User/user.model';
import { ITeamMembership } from './teamMembership.interface';
import { TeamMembership } from './teamMembership.model';
import { TempLink } from '../TempLink/tempLink.modal';
import jwt from 'jsonwebtoken';
import { CustomMembership } from '../CustomMembership/customMembership.model';
import mongoose from 'mongoose';

const createTeamMembershipIntoDB = async (teamMembership: ITeamMembership) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const leader = teamMembership.team.find(member => member.role === 'leader');
    if (!leader?.email) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Team leader email is required',
      );
    }

    const existingMembership = await TeamMembership.findOne({
      'team.email': leader.email,
    }).session(session);

    if (existingMembership) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'User already has a team membership',
      );
    }
    let user;
    user = await User.isUserExistsByEmail(leader.email);
    if (!user) {
      const randomPass = generateRandomPassword();
      user = await User.create(
        [
          {
            email: leader.email,
            password: randomPass,
            provider: 'email with password',
            verified: true,
          },
        ],
        { session },
      );

      await sendClientAccountConfirmationEmail({
        email: leader.email,
        password: randomPass,
      });
    }

    const membership = await CustomMembership.findById(
      teamMembership.membership,
    ).lean();

    if (!membership) {
      throw new AppError(httpStatus.NOT_FOUND, 'Membership plan not found');
    }

    const result = await TeamMembership.create([teamMembership], {
      session,
    });

    const paymentAccessToken = jwt.sign(
      {
        email: leader.email,
        membership: teamMembership.membership,
        amount: membership.amount,
        team: result[0]._id,
      },
      config.jwt_temp_booking_access_secret as string,
      { expiresIn: '3d' },
    );

    const tempLink = await TempLink.create(
      [
        {
          type: 'facility',
          token: paymentAccessToken,
          expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        },
      ],
      { session },
    );

    const paymentLink = `${config.website_live_ui_link}/membership/team/payment/${tempLink[0]._id}`;

    await sendCustomMembershipPaymentEmail({
      team_name: teamMembership.team_name,
      expiry: '3 days',
      email: leader.email,
      amount: membership.amount,
      link: paymentLink,
      team: teamMembership.team,
    });

    await session.commitTransaction();
    session.endSession();

    return result[0];
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getTeamMembershipsFromDB = async (query: Record<string, any>) => {
  const TeamMembershipQuery = new QueryBuilder(
    TeamMembership.find().populate('membership'),
    query,
  )
    .search(['team_name'])
    .paginate();
  const result = await TeamMembershipQuery?.modelQuery;
  const count = await TeamMembershipQuery?.countTotal();
  return {
    count,
    result,
  };
};

const updateTeamMembershipInDB = async (
  id: string,
  payload: Partial<ITeamMembership>,
) => {
  const result = await TeamMembership.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const TeamMembershipServices = {
  createTeamMembershipIntoDB,
  getTeamMembershipsFromDB,
  updateTeamMembershipInDB,
};
