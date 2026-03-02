import Migration "migration";

(with migration = Migration.run)
actor {
  type SiteConfig = {
    inviteCode : Text;
    registrationLink : Text;
  };

  var visitorCount = 0;

  public shared ({ caller }) func incrementVisitorCount() : async Nat {
    visitorCount += 1;
    visitorCount;
  };

  public query ({ caller }) func getConfig() : async SiteConfig {
    {
      inviteCode = "2031355";
      registrationLink = "https://dev.91club.in/auth";
    };
  };
};
