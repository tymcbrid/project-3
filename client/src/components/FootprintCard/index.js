import React, { useState } from "react";
import {
  Row,
  Col,
  Icon,
  Select,
  Button,
} from "react-materialize";
import "./style.css";
import FootprintHistory from "../FootprintHistory";
import axios from "axios";

// Required code for XML to JSON parsing
const parser = require("fast-xml-parser");
const he = require("he");

const options = {
  attributeNamePrefix : "@_",
  attrNodeName: "attr", //default is 'false'
  textNodeName : "#text",
  ignoreAttributes : true,
  ignoreNameSpace : false,
  allowBooleanAttributes : false,
  parseNodeValue : true,
  parseAttributeValue : false,
  trimValues: true,
  cdataTagName: "__cdata", //default is 'false'
  cdataPositionChar: "\\c",
  parseTrueNumberOnly: false,
  arrayMode: false, //"strict"
  attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
  tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
  stopNodes: ["parse-me-as-string"]
};

function FootprintCard() {

  // Set states for the footprint info, household income, household size and household zip code
  const [footprint, setFootprint] = useState([]);
  const [householdIncome, setHouseholdIncome] = useState("");
  const [input, setInput] = useState("");
  const [householdSize, setHouseholdSize] = useState("");

  // Set state for displaying the footprint history card
  const [displayResults, setDisplayResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  // Calls the CoolClimate API and loads the necessary data
  function loadData(inputType, input, householdIncome, householdSize) {
    axios.get("/api/getfootprint/" + inputType + "/" + input + "/" + householdIncome + "/" + householdSize).then(res => {
      const jsonData = parser.parse(res.data, options);
      setFootprint(jsonData.response);
    }
  ).catch(err => console.log(err))};

  // form submit handler - inputType = 1 stands for zip code
  function handleClickSubmit(event) {
    event.preventDefault();
    const inputType = "1";
    if (input && householdIncome && householdSize) {
      loadData(inputType, input, householdIncome, householdSize);
      setErrorMessage(false);      
      setDisplayResults(true);
    } else {
      setErrorMessage(true);
      setDisplayResults(false);
    }
  }

  // income change handler
  function handleIncomeChange(event) {
    setHouseholdIncome(event.target.value);
  }

  // household size change handler
  function handleSizeChange(event) {
    setHouseholdSize(event.target.value);
  }

  // zip code change handler
  function handleInputChange(event) {
    setInput(event.target.value);
  }

  return (
    <Row>
    <Col s={12}>
      <div className="card-panel">

      <form>
        <Row>
          <Col s={12}>
            <div >
              <h2 className="middle">Calculate your carbon footprint</h2>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col className="zip" s={4} l={4}>
            Zip Code:
          </Col>
          <Col s={7} l={7}>
            <input 
              placeholder="Zip Code" 
              type="text" 
              name="name"
              onChange={handleInputChange}/>
          </Col>
        </Row>

        <br></br>
        <Row>
          <Col className="zip" s={4} l={4}>
            Household Income:
          </Col>
          <Col s={7} l={7}>
            <Select
              s={12}
              m={12}
              l={12}
              id="household-income"
              options={{
                classes: "",
                dropdownOptions: {
                  alignment: "left",
                  autoTrigger: true,
                  closeOnClick: true,
                  constrainWidth: true,
                  coverTrigger: true,
                  hover: false,
                  inDuration: 150,
                  onCloseEnd: null,
                  onCloseStart: null,
                  onOpenEnd: null,
                  onOpenStart: null,
                  outDuration: 250,
                },
              }}
              value={""}
              onChange={handleIncomeChange}
            >
              <option disabled value="">
                Select
              </option>
              <option value="1">Average</option>
              <option value="2">Less than $10,000</option>
              <option value="3">$10,000 to $19,999</option>
              <option value="4">$20,000 to $29,999</option>
              <option value="5">$30,000 to $39,999</option>
              <option value="6">$40,000 to $49,999</option>
              <option value="7">$50,000 to $59,999</option>
              <option value="8">$60,000 to $79,999</option>
              <option value="9">$80,000 to $99,999</option>
              <option value="10">$100,000 to $119,999</option>
              <option value="11">$120,000 or more</option>
            </Select>
          </Col>
        </Row>

        <Row>
          <Col className="zip" s={4} l={4}>
            Number of people in household:
          </Col>
          <Col s={7} l={7}>
            <Select
              s={12}
              m={12}
              l={12}
              id="household-size"
              options={{
                classes: "",
                dropdownOptions: {
                  alignment: "left",
                  autoTrigger: true,
                  closeOnClick: true,
                  constrainWidth: true,
                  coverTrigger: true,
                  hover: false,
                  inDuration: 150,
                  onCloseEnd: null,
                  onCloseStart: null,
                  onOpenEnd: null,
                  onOpenStart: null,
                  outDuration: 250,
                },
              }}
              value={""}
              onChange={handleSizeChange}
            >
              <option disabled value="">
                Select
              </option>
              <option value="0">Average</option>
              <option value="1">1 person</option>
              <option value="2">2 people</option>
              <option value="3">3 people</option>
              <option value="4">4 people</option>
              <option value="5">5 or more people</option>
            </Select>
          </Col>
          <Col s={1} l={3} />
        </Row>
        <br></br>
        <Row>
          <Col s={5} m={5} l={5} />
          <Col s={7} m={7} l={7} >
            <Button 
              className={input && householdIncome && householdSize ? ("subButton pulse") : ("subButton")}
              node="button" 
              type="submit" 
              waves="light" 
              onClick={handleClickSubmit}
            >
              Submit
              <Icon right>send</Icon>
            </Button>
          </Col>
        </Row>
      </form>
      {displayResults ? (
        <FootprintHistory data={footprint}/>
      ):
      (<div></div>)}
      {errorMessage ? (
        <p className="errorMess pulse">All fields are required!</p>
      ):
      (<div></div>)}
    </div>
    </Col>
    </Row>
  );
}

export default FootprintCard;
