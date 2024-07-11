import supabase from './supabase';

export type ApprovalRequest = {
  id: number;
  created_at: Date;
  approver: string;
  leave_request: number;
  status: string;
  comment: number;
};

export async function getApprovalRequests(): Promise<ApprovalRequest[]> {
  const { data, error } = await supabase.from('ApprovalRequests').select(`
      id,
      created_at,
      approver!inner(full_name),
      leave_request,
      status,
      comment
    `);

  if (error) {
    console.log(error);
    throw new Error('ApprovalRequests could not be loaded');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const approvalRequests = data.map((approvalRequest: any) => ({
    ...approvalRequest,
    approver: approvalRequest.approver.full_name,
  }));

  return approvalRequests as ApprovalRequest[];
}
