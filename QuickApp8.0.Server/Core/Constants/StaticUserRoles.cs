﻿namespace QuickApp8._0.Server.Core.Constants
{
    public static class StaticUserRoles
    {
        //public const string OWNER = "OWNER";
        //public const string ADMIN = "ADMIN";
        //public const string MANAGER = "MANAGER";
        //public const string USER = "USER";

        public const string OWNER = "HOD";
        public const string ADMIN = "ADMIN";
        public const string MANAGER = "FACULTY";
        public const string USER = "STUDENT";


        public const string OwnerAdmin = "HOD,ADMIN";
        public const string OwnerAdminManager = "HOD,ADMIN,FACULTY";
        public const string OwnerAdminManagerUser = "HOD,ADMIN,FACULTY,STUDENT";

        //public const string OwnerAdmin = "OWNER,ADMIN";
        //public const string OwnerAdminManager = "OWNER,ADMIN,MANAGER";
        //public const string OwnerAdminManagerUser = "OWNER,ADMIN,MANAGER,USER";
    }
}
