export class LoginDto {
  email: string;
  password: string;
}

export class RegisterDto {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
