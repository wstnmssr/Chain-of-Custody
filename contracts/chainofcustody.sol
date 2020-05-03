pragma solidity >=0.5.0;

import "./safemath.sol";

contract ChainOfCustody {

    using SafeMath for uint256;

    uint creation_time; //UNIX timestamp
    address internal case_owner; //the only account that can add or remove authorized agents, also used as holder for "checked in" evidence
    mapping(address => bool) internal authorized_agents;

    uint number_of_items = 0;
    mapping (uint => Evidence) internal id_to_evidence; //item number => Evidence
    mapping (uint => address) internal evidence_holder; //item number => owner address
    mapping (address => uint) internal userEvidenceCount; //owner address => number of evidence taken out
    
    Case_Info case_info;
    
    mapping(uint => Check_Out[]) storage_log;

    struct Case_Info {
        string case_name;
        uint case_number;
    }

    struct Evidence {
        string submitting_agent;
        uint item_number;
        string description_of_evidence;
        string description_of_offense;
        string victim_name;
        string suspect_name;
        string phone_number;

        string condition;
        string notes;

        bool checked_in; //states whether or not evidence has been returned to locker
        bool exists; //false by default in mapping if evidence has not been logged (created)
    }
    
    struct Check_Out {
        address personnel;
        address authorizer;
        string purpose; 
        uint time_checked_out;
        uint time_checked_in;
        bool checked_in; //states whether or not evidence has been returned to locker
    }

    modifier only_owner(){
        require(msg.sender == case_owner);
        _;
    }

    modifier only_authorized(){
        require(authorized_agents[msg.sender]);
        _;
    }
}
