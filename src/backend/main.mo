import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";

actor {
  type SiteConfig = {
    baseUrl : Text;
    inviteCode : Text;
    registrationLink : Text;
  };

  var config : SiteConfig = {
    baseUrl = "";
    inviteCode = "";
    registrationLink = "";
  };

  var visitorCount = 0;

  public shared ({ caller }) func setConfig(baseUrl : Text, inviteCode : Text, registrationLink : Text) : async () {
    config := {
      baseUrl;
      inviteCode;
      registrationLink;
    };
  };

  public shared ({ caller }) func incrementVisitorCount() : async () {
    visitorCount += 1;
  };

  public query ({ caller }) func getConfig() : async SiteConfig {
    if (config.baseUrl == "" or config.inviteCode == "" or config.registrationLink == "") {
      Runtime.trap("Config not set. Please set the config first.")
    };
    config;
  };

  public query ({ caller }) func getVisitorCount() : async Nat {
    visitorCount;
  };
};
