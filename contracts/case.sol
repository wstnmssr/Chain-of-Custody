pragma solidity >= 0.5.0;

pragma experimental ABIEncoderV2;

import "./chainofcustody.sol";

contract Case is ChainOfCustody {

    constructor(string memory _case_name, uint _case_number) public{
        case_info = Case_Info(_case_name, _case_number);
        case_owner = msg.sender;
        authorized_agents[msg.sender] = true; //case_owner is also an authorized agent
        creation_time = now;
    }

    //Evidence Functions

    function log_evidence(
        string memory _submitting_agent,
        string memory _description_of_evidence,
        string memory _description_of_offense,
        string memory _victim_name,
        string memory _suspect_name,
        string memory _phone_number,
        string memory _condition,
        string memory _notes
    ) only_authorized public {
        require(id_to_evidence[number_of_items].exists == false);
        id_to_evidence[number_of_items] = Evidence(
            _submitting_agent,
            number_of_items,
            _description_of_evidence,
            _description_of_offense,
            _victim_name,
            _suspect_name,
            _phone_number,
            _condition,
            _notes,
            true,
            true
        );
        evidence_holder[number_of_items] = case_owner;
        number_of_items = number_of_items.add(1);
    }

    function authorize_agent(address _agent) only_owner public {
        authorized_agents[_agent] = true;
    }

    function deauthorize_agent(address _agent) only_owner public {
        authorized_agents[_agent] = false;
    }

    //check out a piece of evidence from locker
    function check_out(uint _item_number, string memory purpose) only_authorized public {
        require(id_to_evidence[_item_number].exists);//evidence has been logged
        //can only check out evidence if it has been checked in
        require(evidence_holder[_item_number] == case_owner); //evidence is currently checked in
        //Check_Out memory check_out_object = Check_Out(_item_number, personnel, authorizer, purpose, now, 0, false);
        storage_log[_item_number].push(Check_Out(msg.sender, case_owner, purpose, now, 0, false));
        id_to_evidence[_item_number].checked_in = false;
        evidence_holder[_item_number] = msg.sender;
        userEvidenceCount[msg.sender] = userEvidenceCount[msg.sender].add(1);
    }

    //sets checkedIn value of most recent check_out object in Evidence storage_log to true
    function check_in(uint _item_number) only_authorized public {
        require(evidence_holder[_item_number] == msg.sender); //can only check in if function caller holds the evidence
        require(id_to_evidence[_item_number].exists); //evidence has been logged
        require(storage_log[_item_number][storage_log[_item_number].length-1].checked_in == false); //evidence has to be checked out

        storage_log[_item_number][storage_log[_item_number].length-1].checked_in = true;
        storage_log[_item_number][storage_log[_item_number].length-1].time_checked_in = now;
        id_to_evidence[_item_number].checked_in = true;
        userEvidenceCount[msg.sender] = userEvidenceCount[msg.sender].sub(1);
    }

    //update an existing piece of evidence (in case of typos or other reasons)
    //should be used only when necessary!
    function updateEvidence(
        string memory _submitting_agent,
        uint _item_number,
        string memory _description_of_evidence,
        string memory _description_of_offense,
        string memory _victim_name,
        string memory _suspect_name,
        string memory _phone_number,
        string memory _condition,
        string memory _notes
    ) only_authorized public {
        require(id_to_evidence[_item_number].exists);
        id_to_evidence[_item_number] = Evidence(
            _submitting_agent,
            _item_number,
            _description_of_evidence,
            _description_of_offense,
            _victim_name,
            _suspect_name,
            _phone_number,
            _condition,
            _notes,
            id_to_evidence[_item_number].checked_in,
            true
        );
    }

    //getters

    function item_count() public view returns (uint){
        return number_of_items;
    }

    function get_storage_log(uint _item_number) only_authorized public view returns (Check_Out[] memory) {
        return storage_log[_item_number];
    }

    function get_current_check_out(uint _item_number) public view returns (Check_Out memory) {
        require(storage_log[_item_number].length != 0);
        return storage_log[_item_number][storage_log[_item_number].length-1];
    }

    function get_evidence(uint _item_number) public view returns (Evidence memory) {
        return id_to_evidence[_item_number];
    }

    function get_evidence_count() only_authorized public view returns (uint) {
        return userEvidenceCount[msg.sender];
    }

    function getEvidenceByOwner(address _owner) external view returns(uint[] memory) {
            uint[] memory result = new uint[](userEvidenceCount[_owner]);
            uint counter = 0;
            for (uint i = 0; i < number_of_items; i++) {
                if (evidence_holder[i] == _owner) {
                result[counter] = i;
                counter++;
                }
            }
            return result;
    }

    function getIfAgentAuthorized(address agent) external view returns(bool) {
        return authorized_agents[agent];
    }

    function getIfCheckedIn(uint _item_number) external view returns(bool) {
        return id_to_evidence[_item_number].checked_in;
    }
}
