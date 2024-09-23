import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent implements OnInit {
  currentUser: User | null = null;
  isEditing = false;
  isChangingPassword = false;
  userForm: FormGroup;
  passwordForm: FormGroup;
  passwordError = '';
  showPassword: boolean = false; 
  showNewPassword: boolean = false;
  showConfirmNewPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(15),
        this.passwordValidator
      ]],
      confirmNewPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    this.userService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      if (user) {
        this.userForm.patchValue({
          name: user.name,
          email: user.email,
        });
      }
    });
  }

  onEdit(): void {
    this.isEditing = true;
  }

  onCancelEdit(): void {
    this.isEditing = false;
    this.loadCurrentUser(); // Reset changes
  }

  onSubmit(): void {
    if (this.userForm.valid && this.currentUser) {
      const updatedUser: User = {
        ...this.currentUser,
        name: this.userForm.value.name,
        email: this.userForm.value.email,
      };

      this.userService.updateUser(updatedUser).subscribe({
        next: (user) => {
          console.log('User updated:', user);
          alert('Your profile was updated successfully.');
          this.isEditing = false;
        },
        error: (error) => {
          console.error('Error updating user:', error);
        },
      });
    }
  }

  onChangePassword(): void {
    this.isChangingPassword = true;
  }

  onCancelPasswordChange(): void {
    this.isChangingPassword = false;
    this.passwordForm.reset();
    this.passwordError = '';
  }

  onSubmitNewPassword(): void {
    if (!this.currentUser) return;

    const { currentPassword, newPassword, confirmNewPassword } = this.passwordForm.value;

    // Validate current password
    if (this.currentUser.password !== currentPassword) {
      this.passwordError = 'Current password is incorrect.';
      return;
    }

    // Validate new password match
    if (newPassword !== confirmNewPassword) {
      this.passwordError = 'New passwords do not match.';
      return;
    }

    // Update password
    this.currentUser.password = newPassword;
    this.userService.updateUser(this.currentUser).subscribe({
      next: () => {
        console.log('Password updated successfully.');
        this.onCancelPasswordChange();
      },
      error: (error) => {
        console.error('Error updating password:', error);
        this.passwordError = 'Failed to update password.';
      },
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Toggles the value of showPassword
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmNewPasswordVisibility() {
    this.showConfirmNewPassword = !this.showConfirmNewPassword;
  }

  private passwordValidator(control: { value: string }) {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
    if (!valid) {
      return { passwordInvalid: true };
    }
    return null;
  }
}
