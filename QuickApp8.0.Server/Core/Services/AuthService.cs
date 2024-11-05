using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using OpenIddict.Abstractions;
using Polly;
using QuickApp8._0.Server.Core.Constants;
using QuickApp8._0.Server.Core.DbContext;
using QuickApp8._0.Server.Core.Dtos.Auth;
using QuickApp8._0.Server.Core.Dtos.Genral;
using QuickApp8._0.Server.Core.Entities;
using QuickApp8._0.Server.Core.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace QuickApp8._0.Server.Core.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ILogService _logService;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _applicationDbContext;

        public AuthService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ILogService logService, IConfiguration configuration,ApplicationDbContext applicationDbContext )
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _logService = logService;
            _configuration = configuration;
            _applicationDbContext = applicationDbContext;
        }

        public async Task SeedAsync()
        {
            await _applicationDbContext.Database.MigrateAsync();
            await SeedRoleAsync();
            await SeedDefaultUsersAsync();
            await SeedDefaultSubjectAndAssignments();
        }

        public async Task SeedDefaultSubjectAndAssignments()
        {
            Subject subject1 = new Subject { SubjectName="System Designs" };
            Subject subject2 = new Subject { SubjectName="Operating Systems" };
            Subject subject3 = new Subject { SubjectName="Data Structures & Algorithms" };
            Subject subject4 = new Subject { SubjectName="Business Ethics And Analysis" };
            Subject subject5 = new Subject { SubjectName="Professional Ethics" };

            Exam exam1 = new Exam { ExamName="WINTER",ExamYear=2024,ExamStatus=ExamState.ONGOING};
            Exam exam2 = new Exam { ExamName="SUMMER",ExamYear=2024,ExamStatus=ExamState.ENDED};
            Exam exam3 = new Exam { ExamName="SUMMER",ExamYear=2025,ExamStatus=ExamState.INITIALIZING};
            

            if (!await _applicationDbContext.subjects.AnyAsync())
            {
                await _applicationDbContext.subjects.AddAsync(subject1);
                await _applicationDbContext.subjects.AddAsync(subject2);
                await _applicationDbContext.subjects.AddAsync(subject3);
                await _applicationDbContext.subjects.AddAsync(subject4);
                await _applicationDbContext.subjects.AddAsync(subject5);
            }

            if(!await _applicationDbContext.exams.AnyAsync())
            {
                await _applicationDbContext.exams.AddAsync(exam1);
                await _applicationDbContext.exams.AddAsync(exam2);
                await _applicationDbContext.exams.AddAsync(exam3);
            }
        }

        public async Task SeedDefaultUsersAsync()
        {
            ApplicationUser defaultUserOne = new ApplicationUser();
            {
                defaultUserOne.UserName = "Admin";
                defaultUserOne.FullName = "Inbuilt Admin Account";
                defaultUserOne.Email = "admin@test.com";

            };

            ApplicationUser defaultUserTwo = new ApplicationUser();
            {
                defaultUserTwo.UserName = "Faculty";
                defaultUserTwo.FullName = "Inbuilt Faculty Account";
                defaultUserTwo.Email = "faculty@test.com";

            };

            ApplicationUser defaultUserTwoTwo = new ApplicationUser();
            {
                defaultUserTwoTwo.UserName = "Faculty2";
                defaultUserTwoTwo.FullName = "Inbuilt Faculty Account";
                defaultUserTwoTwo.Email = "faculty2@test.com";

            };

            ApplicationUser defaultUserThree = new ApplicationUser();
            {
                defaultUserThree.UserName = "Student";
                defaultUserThree.FullName = "Inbuilt Student Account";
                defaultUserThree.Email = "student@test.com";

            };

            ApplicationUser defaultUserThreeThree = new ApplicationUser();
            {
                defaultUserThreeThree.UserName = "Student2";
                defaultUserThreeThree.FullName = "Inbuilt Student Account";
                defaultUserThreeThree.Email = "student2@test.com";

            };

            ApplicationUser defaultUserFour = new ApplicationUser();
            {
                defaultUserFour.UserName = "NewUser";
                defaultUserFour.FullName = "Inbuilt Default Account";
                defaultUserFour.Email = "newuser@test.com";

            };
            ApplicationUser defaultUserFourFour = new ApplicationUser();
            {
                defaultUserFourFour.UserName = "NewUser2";
                defaultUserFourFour.FullName = "Inbuilt Default Account";
                defaultUserFourFour.Email = "newuser2@test.com";

            };

            if (!await _applicationDbContext.Users.AnyAsync())
            {

                var defaultAdmin = await CreateUserAsync(defaultUserOne, "Test@123",StaticUserRoles.OWNER);
              
                var defaultFaculty = await CreateUserAsync(defaultUserTwo, "Test@123", StaticUserRoles.ADMIN);
                var defaultFaculty2 = await CreateUserAsync(defaultUserTwoTwo, "Test@123", StaticUserRoles.ADMIN);

                var defaultStudent = await CreateUserAsync(defaultUserThree, "Test@123", StaticUserRoles.MANAGER);
                var defaultStudent2 = await CreateUserAsync(defaultUserThreeThree, "Test@123", StaticUserRoles.MANAGER);

                var defaultUser = await CreateUserAsync(defaultUserFour, "Test@123", StaticUserRoles.USER);
                var defaultUser2 = await CreateUserAsync(defaultUserFourFour, "Test@123", StaticUserRoles.USER);

            }
        }

        private async Task<IdentityResult> CreateUserAsync(ApplicationUser user,string Password,string staticUserRoles)
        {
            var registeredUser = await _userManager.CreateAsync(user, Password);

            if (registeredUser.Succeeded) {

                await _userManager.AddToRoleAsync(user, staticUserRoles);
            }

            return registeredUser;
        }

        public async Task<GenralServiceResponseDto> SeedRoleAsync()
        {
            bool isOwnerRoleExists = await _roleManager.RoleExistsAsync(StaticUserRoles.OWNER);
            bool isAdminRoleExists = await _roleManager.RoleExistsAsync(StaticUserRoles.ADMIN);
            bool isManagerRoleExists = await _roleManager.RoleExistsAsync(StaticUserRoles.MANAGER);
            bool isUserRoleExists = await _roleManager.RoleExistsAsync(StaticUserRoles.USER);
            
            if (isOwnerRoleExists && isAdminRoleExists && isManagerRoleExists && isUserRoleExists)
            return new GenralServiceResponseDto()
            {
                IsSucceed = true,
                StatusCode = 200,
                Message = "Role Seeding Is Already Done"
            };

            await _roleManager.CreateAsync(new IdentityRole(StaticUserRoles.OWNER));
            await _roleManager.CreateAsync(new IdentityRole(StaticUserRoles.ADMIN));
            await _roleManager.CreateAsync(new IdentityRole(StaticUserRoles.MANAGER));
            await _roleManager.CreateAsync(new IdentityRole(StaticUserRoles.USER));
            return new GenralServiceResponseDto()
            {

                IsSucceed = true,
                StatusCode = 201,
                Message = "Role Seeding Successfully"
            };
        }

        public async Task<GenralServiceResponseDto> RegisterAsync(RegisterDto registerDto)
        {
            var isExistsUser = await _userManager.FindByNameAsync(registerDto.UserName);
            if (isExistsUser is not null)
                return new GenralServiceResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = 409,
                    Message = "UserName Alredy Exists"
                };

            ApplicationUser newUser = new ApplicationUser();
            {
                newUser.UserName = registerDto.UserName;
                newUser.FullName = registerDto.FullName;
                newUser.Email = registerDto.Email;
                newUser.SecurityStamp = Guid.NewGuid().ToString();
            };

            var areRoleSeeded = await _roleManager.RoleExistsAsync(StaticUserRoles.USER);

            if (!areRoleSeeded)
            {
                return new GenralServiceResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = 409,
                    Message = "Roles Are Not Seeded"
                };
            }

            var createUserResult = await _userManager.CreateAsync(newUser, registerDto.Password);
            if (!createUserResult.Succeeded)
            {
                return new GenralServiceResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = 400,
                    Message = "User Creation Faild Because:"
                };
            }

            // Add a user
            await _userManager.AddToRoleAsync(newUser, StaticUserRoles.USER);
            await _logService.SaveNewLog(newUser.UserName, "Registered to Website");
            return new GenralServiceResponseDto()
            {
                IsSucceed = true,
                StatusCode = 201,
                Message = "User created Successfully"
            };
        }

        //public async Task<LoginServiceResponseDto?> LoginAsync(LoginDto loginDto)
        //{ // Find user with username
        //    var user = await _userManager.FindByNameAsync(loginDto.UserName);
        //    if (user is null)
        //    {
        //        return null;
        //    }

        //    if (user.IsBlocked)
        //    {
        //        return null;
        //    }
                

        //    // check password of user
        //    var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, loginDto.Password);
        //    if (!isPasswordCorrect)
        //    {
        //        return null;
        //    }
                

        //    // Return Token and userInfo to front-end
        //    var newToken = await GenerateJWTTokenAsync(user);
        //    var roles = await _userManager.GetRolesAsync(user);
        //    var userInfo = GenerateUserInfoObject(user, roles);
        //    await _logService.SaveNewLog(user.UserName, "New Login");

        //    return new LoginServiceResponseDto()
        //    {
        //        NewToken = newToken,
        //        UserInfo = userInfo
        //    };
        //}

        public async Task<GenralServiceResponseDto> UpdateRoleAsync(ClaimsPrincipal User, UpdateRoleDto updateRoleDto)
        {
            var user = await _userManager.FindByNameAsync(updateRoleDto.UserName);
            if (user is null)
                return new GenralServiceResponseDto()
                { 
                    IsSucceed = false,
                    StatusCode = 404,
                    Message = "Invalid UserName"
                };

            var userRoles = await _userManager.GetRolesAsync(user);
            // Just The OWNER and ADMIN can update roles
            if (User.IsInRole(StaticUserRoles.ADMIN))
            {
                // User is Admin
                if (updateRoleDto.NewRole == RoleType.STUDENT || updateRoleDto.NewRole == RoleType.FACULTY)
                {
                    // owners and admin  can change the role of everyone excepted
                    if (userRoles.Any(q => q.Equals(StaticUserRoles.OWNER) || q.Equals(StaticUserRoles.ADMIN)))
                    {
                        return new GenralServiceResponseDto()
                        {
                            IsSucceed = false,
                            StatusCode = 403,
                            Message = "ou are not allowed to change role of this user"
                        };
                    }
                    else
                    {
                        await _userManager.RemoveFromRolesAsync(user, userRoles);
                        await _userManager.AddToRoleAsync(user, updateRoleDto.NewRole.ToString());
                        await _logService.SaveNewLog(user.UserName, "User Roles Updated");
                        return new GenralServiceResponseDto()
                        {
                            IsSucceed = true,
                            StatusCode = 200,
                            Message = "Role updated successfully"
                        };
                    }
                }
                else return new GenralServiceResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = 403,
                    Message = "You are not allowed to change role of this user"
                };
            }
            else
            {
                // user is owner
                if (userRoles.Any(q => q.Equals(StaticUserRoles.OWNER)))
                {
                    return new GenralServiceResponseDto()
                    {
                        IsSucceed = false,
                        StatusCode = 403,
                        Message = "You are not allowed to change role of this user"
                    };
                }
                else
                {
                    await _userManager.RemoveFromRolesAsync(user, userRoles);
                    await _userManager.AddToRoleAsync(user, updateRoleDto.NewRole.ToString());
                    await _logService.SaveNewLog(user.UserName, "User Roles Updated");
                    return new GenralServiceResponseDto()
                    {
                        IsSucceed = true,
                        StatusCode = 200,
                        Message = "Role updated successfully"
                    };
                }
            }
        }

        public async Task<UserInfoResult?> MeAsync(ClaimsPrincipal User)
        {
            string decodedUserName = User.Claims.FirstOrDefault(q => q.Type == OpenIddictConstants.Claims.Name).Value;
            if (decodedUserName is null)
                return null;

            var user = await _userManager.FindByNameAsync(decodedUserName);
            if (user is null)
                return null;

            // Return Token and userInfo to front-end
            var roles = await _userManager.GetRolesAsync(user);
            var userInfo = GenerateUserInfoObject(user, roles);

            return userInfo;
        }

        public async Task<IEnumerable<UserInfoResult>> GetUsersListAsync()
        {
            var users = await _userManager.Users.ToListAsync();

            List<UserInfoResult> userInfoResults = new List<UserInfoResult>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                var userInfo = GenerateUserInfoObject(user, roles);
                userInfoResults.Add(userInfo);
            }
            return userInfoResults;
        }

        public async Task<UserInfoResult?> GetUserDetailsByUserNameAsync(string userName)
        {
           var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
                return null;

            var roles = await _userManager.GetRolesAsync(user);
            var userInfo = GenerateUserInfoObject(user,roles);
            return userInfo;
        }

        public async Task<string> DeleteByIdAsync(string Id)
        {
            var user = _userManager.Users.SingleOrDefault(x => x.Id == Id); 

            if (user != null)
            {
                var result = await _userManager.DeleteAsync(user);

                if (result.Succeeded)
                {
                    return "User Deleted Successfully";
                }
            }
            return "User Not Found";
        }

        public async Task<GenralServiceResponseDto> BlockByIdAsync(string Id)
        {
            var user = await _userManager.FindByIdAsync(Id);

            if (user != null)
            {
                if (user.IsBlocked == true)
                {
                    user.IsBlocked = false;
                }
                else
                {
                    user.IsBlocked = true;
                }

                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded)
                {
                    if (user.IsBlocked == true)
                    {
                        return new GenralServiceResponseDto()
                        {
                            IsSucceed = true,
                            StatusCode = 403,
                            Message = "User is Blocked"
                        };
                    }
                    else
                    {
                        return new GenralServiceResponseDto()
                        {
                            IsSucceed = false,
                            StatusCode = 403,
                            Message = "User is UnBlocked"
                        };
                    }

                }
            }
            return new GenralServiceResponseDto()
            { 
                IsSucceed = false,
                StatusCode = 404,
                Message = "User Not Found"
            };
        }

        //GenerateJWTToken
        private async Task<string> GenerateJWTTokenAsync(ApplicationUser user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim("FullName", user.FullName)
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var authSecret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            var signingCredentials = new SigningCredentials(authSecret, SecurityAlgorithms.HmacSha256);

            var tokenObject = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddMinutes(30),
                claims: authClaims,
                signingCredentials: signingCredentials
                );

            string token = new JwtSecurityTokenHandler().WriteToken(tokenObject);
            return token;
        }

        //GenerateUserInfoObject
        private UserInfoResult GenerateUserInfoObject(ApplicationUser user, IEnumerable<string> Roles)
        {

            return new UserInfoResult()
            {
                Id = (user.Id),
                FullName = user.FullName,
                UserName = user.UserName,
                Email = user.Email,
                CreatedAt = user.CreatedAt,
                Roles = Roles,
                IsBlocked = user.IsBlocked,
            };
        }

        public async Task<UserInfoResult?> GetUserDetailsByUserIdAsync(string userID)
        {
            var user = await _userManager.FindByIdAsync(userID);
            if (user == null)
                return null;

            var roles = await _userManager.GetRolesAsync(user);
            var userInfo = GenerateUserInfoObject(user, roles);
            return userInfo;
        }
    }
}
