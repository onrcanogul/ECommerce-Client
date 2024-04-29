export class ListUsers {
    totalCount : number;
    users: Users[]
}

export class Users{
    id: string;
    username: string;
    nameSurname: string;
    email: string;
    phoneNumber: string;
    Roles: []
}

// Id = u.Id,
// Username = u.UserName,
// NameSurname = u.NameSurname,
// Email = u.Email,
// PhoneNumber = u.PhoneNumber,
// Roles = _userManager.GetRolesAsync(u),