import { replace } from "lodash";

interface ValidationError {
  message: string;
  path: Array<string | number>;
  type: string;
}
interface ErrorResponse {
  code: number;
  message: string;
}

interface ResponseParams {
  res: any;
  err: ErrorResponse;
  details: ValidationError[];
}

interface ValidationResult {
  [key: string]: string;
}

const validationMessage = (err: ValidationError[]): ValidationResult =>
  err.reduce((obj: ValidationResult, item: ValidationError) => {
    obj[item.path[0]] = replace(item.message, /"/g, '');
    return obj;
  }, {});

const response = ({ res, err, details }: ResponseParams): any => {
  const { code, message } = err;
  return res.status(code).json({ message, value: validationMessage(details) });
};

export default {
  validationMessage,
  response,
};
