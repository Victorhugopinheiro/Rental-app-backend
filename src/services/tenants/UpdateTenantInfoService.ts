import { prisma } from "../../lib/prisma";




export const UpdateTenantInfoService = async ({
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
  const updatedTenant = await prisma.tenant.update({
    where: { cognitoId },
    data: {
      name,
      email,
      phoneNumber,
    },
  });

  return updatedTenant;
};