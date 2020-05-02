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
        uint _case_number,
        uint _item_number,
        string memory _description_of_evidence,
        string memory _description_of_offense,
        string memory _victim_name,
        string memory _suspect_name,
        string memory _phone_number,
        string memory _condition,
        uint _lab_case_number,
        string memory _notes,
        Relocation[] memory _relocations,
        Check_Out[] memory _storage_log,
        string memory _status
    ) only_authorized public {
        require(id_to_evidence[_item_number].exists == false);
        id_to_evidence[_item_number] = Evidence(
            _submitting_agent,
            _case_number,
            _item_number,
            _description_of_evidence,
            _description_of_offense,
            _victim_name,
            _suspect_name,
            _phone_number,
            _condition,
            _lab_case_number,
            _notes,
            _relocations,
            _storage_log,
            _status,
            true
        );
        evidence_holder[_item_number] = case_owner;
        number_of_items = number_of_items.add(1);
    }

    function authorize_agent(address _agent) only_owner public {
        authorized_agents[_agent] = true;
    }

    function deauthorize_agent(address _agent) only_owner public {
        authorized_agents[_agent] = false;
    }
    
    //record the relocation of a piece of evidence
    /*function relocate(
        uint _item_number,
        string memory  street_number1,
        string memory  street_name1,
        string memory  city1,
        string memory  state1,
        string memory  zip_code1,
        uint latitude1,
        uint longitude1,
        string memory  description1,
        string memory  street_number2,
        string memory  street_name2,
        string memory  city2,
        string memory  state2,
        string memory  zip_code2,
        uint latitude2,
        uint longitude2,
        string memory  description2,
        bool complete,
        string memory  description3
    ) only_authorized public {
        Location memory location1 = Location(street_number1, street_name1, city1, state1, zip_code1, latitude1, longitude1, description1);
        Location memory location2 = Location(street_number2, street_name2, city2, state2, zip_code2, latitude2, longitude2, description2);
        Relocation memory relocation = Relocation(location1, location2, complete, description3);
        id_to_evidence[_item_number].relocations.push(relocation);
    }*/
    
    //record the relocation of a piece of evidence, uses pre-existing location objects
    function relocate(uint _item_number, Location memory location1, Location memory location2, bool complete, string memory description) only_authorized public {
        Relocation memory relocation = Relocation(location1, location2, complete, description);
        id_to_evidence[_item_number].relocations.push(relocation);
    }
    
    //check out a piece of evidence from locker
    function check_out(uint _item_number, address personnel, address authorizer, string memory purpose) only_authorized public {
        //can only check out evidence if it has been checked in
        if (id_to_evidence[_item_number].storage_log.length != 0) {
            uint storage_log_size = id_to_evidence[_item_number].storage_log.length;
            require(id_to_evidence[_item_number].storage_log[storage_log_size].checked_in);
        }
        require(id_to_evidence[_item_number].exists); //evidence has been logged
        Check_Out memory check_out_object = Check_Out(personnel, authorizer, purpose, now, 0, false);
        id_to_evidence[_item_number].storage_log.push(check_out_object);
        id_to_evidence[_item_number].status = strConcat("Checked out by ", toString(msg.sender));
        evidence_holder[_item_number] = msg.sender;
    }
    
    //sets checkedIn value of most recent check_out object in Evidence storage_log to true
    function check_in(uint _item_number) only_authorized public {
        require(evidence_holder[_item_number] == msg.sender); //can only check in if function caller holds the evidence
        require(id_to_evidence[_item_number].exists); //evidence has been logged
        
        uint last_check_out = id_to_evidence[_item_number].storage_log.length - 1; 
        id_to_evidence[_item_number].storage_log[last_check_out].checked_in = true;
        id_to_evidence[_item_number].storage_log[last_check_out].time_checked_in = now;
        id_to_evidence[_item_number].status = "Stored in evidence locker";
    }
    
    //update an existing piece of evidence (in case of typos or other reasons)
    //should be used very sparingly!
    function updateEvidence(
        string memory _submitting_agent,
        uint _case_number,
        uint _item_number,
        string memory _description_of_evidence,
        string memory _description_of_offense,
        string memory _victim_name,
        string memory _suspect_name,
        string memory _phone_number,
        string memory _condition,
        uint _lab_case_number,
        string memory _notes,
        Relocation[] memory _relocations,
        Check_Out[] memory _storage_log,
        string memory _status
    ) only_authorized public {
        require(id_to_evidence[_item_number].exists == false);
        id_to_evidence[_item_number] = Evidence(
            _submitting_agent,
            _case_number,
            _item_number,
            _description_of_evidence,
            _description_of_offense,
            _victim_name,
            _suspect_name,
            _phone_number,
            _condition,
            _lab_case_number,
            _notes,
            _relocations,
            _storage_log,
            _status,
            true
        );
    }
    
    //add location to locations array for ease of use
    function addLocation(
        string memory street_number,
        string memory street_name,
        string memory city,
        string memory state,
        string memory zip_code,
        uint latitude,
        uint longitude,
        string memory description
    ) only_authorized public {
        locations.push(Location(street_number, street_name, city, state, zip_code, latitude, longitude, description));
    }
    
    //code adapted from user Thomas Bertani from page "https://ethereum.stackexchange.com/questions/729/how-to-concatenate-strings-in-solidity"
    function strConcat(string memory _a, string memory _b) internal returns (string memory){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        string memory ab = new string(_ba.length + _bb.length);
        bytes memory bab = bytes(ab);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) bab[k++] = _ba[i];
        for (uint i = 0; i < _bb.length; i++) bab[k++] = _bb[i];
        return string(bab);
    }
    
    //code taken from user eth from page "https://ethereum.stackexchange.com/questions/8346/convert-address-to-string"
    function toString(address x) public returns (string memory) {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++)
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        return string(b);
    }
    
    //getters

    function item_count() public view returns (uint){
        return number_of_items;
    }
    
    function get_locations() public view returns (Location[] memory) {
        return locations;
    }
    
    function get_relocations(uint _item_number) public view returns (Relocation[] memory) {
        return id_to_evidence[_item_number].relocations;
    }
    
    function get_storage_log(uint _item_number) public view returns (Check_Out[] memory) {
        return id_to_evidence[_item_number].storage_log;
    }
}
