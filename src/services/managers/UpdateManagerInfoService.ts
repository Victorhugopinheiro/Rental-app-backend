import { prisma } from "../../lib/prisma";




export const UpdateManagerInfoService = async ({
  cognitoId,
  name,
  email,
  phoneNumber,
}: {
  cognitoId: string;
  name: string;
  email: string;
  phoneNumber: string;
}) => {
  const updatedManager = await prisma.manager.update({
    where: { cognitoId },
    data: {
      name,
      email,
      phoneNumber,
    },
  });

  return updatedManager;
};