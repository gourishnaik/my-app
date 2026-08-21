export enum Role { // enum instead of raw strings -> typos caught at compile time, one place to add/rename roles, autocomplete on @Roles(...)
  Admin = 'admin', // full access — passes any @Roles(Role.Admin) check
  User = 'user', // regular account — fails routes that require Role.Admin
}
