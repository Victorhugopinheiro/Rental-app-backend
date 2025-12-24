declare const getLeasesPaymentService: ({ leaseId }: {
    leaseId: string;
}) => Promise<{
    id: number;
    leaseId: number;
    amountDue: number;
    amountPaid: number;
    dueDate: Date;
    paymentDate: Date;
    paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
}[]>;
export default getLeasesPaymentService;
