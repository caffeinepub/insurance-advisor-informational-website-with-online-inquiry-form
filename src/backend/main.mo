import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Insurance Inquiry Management
  type InquiryState = {
    phone : Text;
    email : ?Text;
    insuranceType : Text;
    preferredCompany : ?Text;
    message : Text;
  };

  type SubmittedInquiry = {
    id : Nat;
    name : Text;
    state : InquiryState;
  };

  let inquiries = Map.empty<Nat, SubmittedInquiry>();
  var nextInquiryId = 0;

  // Public endpoint - no authentication required (guests can submit)
  public func submitInquiry(name : Text, state : InquiryState) : async () {
    let inquiryId = nextInquiryId;
    let inquiry : SubmittedInquiry = {
      id = inquiryId;
      name;
      state;
    };

    inquiries.add(inquiryId, inquiry);
    nextInquiryId += 1;
  };

  // Admin-only endpoint to view all inquiries
  public query ({ caller }) func getAllInquiries() : async [SubmittedInquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all inquiries");
    };
    inquiries.values().toArray();
  };
};
