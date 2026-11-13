import { query } from 'express-validator';
export const validateStatusId = (validStatusIds) => { return query("statusId").isNumeric().isIn(validStatusIds).withMessage("Invalid status id"); };

export const validateStatus = (validStatuses) => { 
    return query("status")
    .optional()
    .toArray()
    .custom((statuses) => {
      statuses.forEach((s) => {
          if (! validStatuses.includes(s)) {
              throw new Error("Invalid status");
          }
      });
      return true;
    })
};