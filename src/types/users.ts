export type TUser = {
  _id: string;
  name: TUserName;
  role: string;
  email: string;
  needsPasswordChange: boolean;
  isDeleted: boolean;
  isActive: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  fullName: string;
  id: string;
};

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
