module {
  type OldSiteConfig = {
    baseUrl : Text;
    inviteCode : Text;
    registrationLink : Text;
  };

  type OldActor = {
    config : OldSiteConfig;
    visitorCount : Nat;
  };

  type NewActor = {
    visitorCount : Nat;
  };

  public func run(old : OldActor) : NewActor {
    { visitorCount = old.visitorCount };
  };
};
