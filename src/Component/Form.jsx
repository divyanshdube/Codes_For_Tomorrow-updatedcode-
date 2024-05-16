import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  Input,
  Button,
  Label,
} from "reactstrap";

const Form = () => {
  return (
    <div>
      <Card className="ms-5 me-5" style={{backgroundColor:"#EBF2F7"}}>
        <CardBody>
          <Row>
            <Col sm="6" md="6">
              <Label>First Name:</Label>
              <Input type="text" placeholder="John"></Input>
            </Col>
            <Col sm="6" md="6" className="mt-2">
              <Label>Last Name:</Label>
              <Input type="text" placeholder="Doe"></Input>
            </Col>
            <Col sm="6" md="12" className="mt-2">
              <Label>Address:</Label>
              <Input type="textarea" placeholder="Enter your full Postal Address"></Input>
            </Col>
            <Col sm="6" md="6" className="mt-2">
              <Label>Country:</Label>
              <Input type="text" placeholder="India"></Input>
            </Col>
            <Col sm="6" md="6" className="mt-2">
              <Label>Email ID:</Label>
              <Input type="text" placeholder="Example@sample.com"></Input>
            </Col>
            <Col sm="6" md="6" className="mt-2">
              <Label>Phone Number:</Label>
              <Input type="text" placeholder="123456789"></Input>
            </Col>

          </Row>
            <Col sm="6" md="6" className="mt-3">
              <Button type="submit" style={{backgroundColor:"#94E9C5", color:"black", fontWeight:"bold"}}>Submit Feedback</Button>
            </Col>
        </CardBody>
      </Card>
    </div>
  );
};

export default Form;
