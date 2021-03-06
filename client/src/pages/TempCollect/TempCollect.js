import React, { Component } from "react";
import API from "../../utils/API";
import "./TempCollect.scss";
import { Container, Button,} from "reactstrap";
import styled from "styled-components"

const ButtonDiv = styled.div`
margin:5px;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
border-radius: 5px; /* 5px rounded corners */
background-color:rgb(132, 25, 240)
`



class TempCollect extends Component {
    state = {
        temp: "",
        weight: "",
        sleep: "",
        spotting: "",
        hungover: null,
        bc: null,
        symptoms: "",
        loggedIn: "false",
        user: null
    }

    componentDidMount() {
        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                this.setState({
                    loggedIn: true,
                    user: user.data.user
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleButtonClick = event => {
        event.preventDefault();

        if (this.state.loggedIn) {
            const log = {
                temp: Number(this.state.temp),
                weight: Number(this.state.weight),
                sleep: Number(this.state.sleep),
                spotting: Number(this.state.spotting),
                hungover: this.state.hungover,
                bc: this.state.bc,
                symptoms: this.state.symptoms,
                _userId: this.state.user._id
            }



            API.addLog(log)
        }
        
        alert("Your log has been added successfully! Check 'all logs' for your history!");
    }

    render() {
        // var TempCollectStyle = {
        // padding: 10,
        // margin: 10,
        // backgroundColor: "f5f5f5",
        // color: "#333",
        // display: "inline-block",
        // fontFamily: "monospace",
        // fontSize: 32,
        // textAlign: "center"
        // };
        return (

            // <div TempCollectStyle={{ backgroundImage: f5f5f5 }}>

            <Container className="tempCollectPage">
                <div style={{ marginTop: 10 }} >
                    
                    <h3 style={{textAlign:"center"}}>Log your temperature and any symptoms or notes you have!!</h3>
                    
                    <br />
                    <br />

                    <form>
                        <div className="form-group">
                            <label className="sr-only" htmlFor="exampleInputAmount">Temperature (in degrees)</label>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <i className="fas fa-temperature-low"></i></div>
                                <input
                                    type="text"
                                    name="temp"
                                    className="form-control"
                                    id="exampleInputAmount"
                                    placeholder="Temperature"
                                    onChange={this.handleInputChange}
                                    value={this.state.temp}
                                ></input>

                            </div>
                        </div>
                        <br />
                        <br />

                        <div className="form-group">
                            <label className="sr-only" htmlFor="exampleInputAmount">Weight (in pounds)</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fas fa-weight"></i></div>
                                <input
                                    type="text"
                                    name="weight"
                                    className="form-control"
                                    id="exampleInputAmount"
                                    placeholder="Weight"
                                    onChange={this.handleInputChange}
                                    value={this.state.weight}
                                ></input>


                            </div>
                        </div>

                        <br />
                        <br />

                        <div className="form-group">
                            <i className="fas fa-bed"></i> <label htmlFor="hoursSlept"> How many hours did you sleep last night?</label>
                            <select className="form-control" name="sleep" onChange={this.handleInputChange}
                                value={this.state.sleep} >
                                <option placeholder="0">0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                            </select>
                        </div>
                        <br />

                        <div className="form-group">
                            <i className="fas fa-tint"></i> <label htmlFor="spotting"> If any, how would you rate your spotting?</label>
                            <select className="form-control" name="spotting" onChange={this.handleInputChange}
                                value={this.state.spotting} >
                                <option placeholder="5 is some serious spotting!">5 is some serious spotting!</option>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <br />
                        <i className="fas fa-cocktail"></i> <label htmlFor="hangover">Are you hungover?</label>
                        <div className="radio">
                            <label>
                                <input
                                    type="radio"
                                    name="hungover"
                                    id="blankCheckbox"
                                    value="true"
                                    aria-label="..."
                                    onChange={this.handleInputChange}
                                    checked={this.state.hungover === "true"}
                                ></input> Yes
                         </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input
                                    type="radio"
                                    name="hungover"
                                    id="blankCheckbox"
                                    value="false"
                                    aria-label="..."
                                    onChange={this.handleInputChange}
                                    checked={this.state.hungover === "false"}
                                ></input> No
                         </label>
                        </div>
                        <br />
                        <br />
                        <i className="fas fa-capsules"></i> <label htmlFor="BC">Did You take Your Birth Control?</label>
                        <div className="radio">
                            <label>
                                <input
                                    type="radio"
                                    name="bc"
                                    id="blankCheckbox"
                                    value="true"
                                    aria-label="..."
                                    onChange={this.handleInputChange}
                                    checked={this.state.bc === "true"}
                                ></input> Yes
                         </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input
                                    type="radio"
                                    name="bc"
                                    id="blankCheckbox"
                                    value="false"
                                    aria-label="..."
                                    onChange={this.handleInputChange}
                                    checked={this.state.bc === "false"}
                                ></input> No
                         </label>
                        </div>
                        <br />
                        <br />
                        <textarea className="form-control" name="symptoms" rows="3" placeholder="What symptoms are you experiencing?" onChange={this.handleInputChange}
                            value={this.state.symptoms} ></textarea>
                        <br />
                        <ButtonDiv>
                            <Button onClick={this.handleButtonClick} color="" block>
                                Log Entry </Button>
                        </ButtonDiv>
                    </form>

                </div>
            </Container >


        )


    }
}

export default TempCollect;