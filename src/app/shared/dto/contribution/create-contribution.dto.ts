import { Objective } from '../../models/database/Objective.modal';

export interface ContributionDto {
  amount: number;
  message?: string;
  created_at: Date;
  objective: Objective;
}
