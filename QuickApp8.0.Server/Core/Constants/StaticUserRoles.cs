namespace QuickApp8._0.Server.Core.Constants
{
    public static class StaticUserRoles
    {
        //public const string OWNER = "OWNER";
        //public const string ADMIN = "ADMIN";
        //public const string MANAGER = "MANAGER";
        //public const string USER = "USER";

        public const string OWNER = "HOD";
        public const string ADMIN = "FACULTY";
        public const string MANAGER = "STUDENT";
        public const string USER = "USER";


        public const string OwnerAdmin = "HOD,FACULTY";
        public const string OwnerAdminManager = "HOD,FACULTY,STUDENT";
        public const string OwnerAdminManagerUser = "HOD,FACULTY,STUDENT,USER";

        //public const string OwnerAdmin = "OWNER,ADMIN";
        //public const string OwnerAdminManager = "OWNER,ADMIN,MANAGER";
        //public const string OwnerAdminManagerUser = "OWNER,ADMIN,MANAGER,USER";
    }
}
