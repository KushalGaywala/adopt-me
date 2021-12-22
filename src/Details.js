import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

// This is a class Custom HOOK
class Details extends Component {
  // Constructor Method:
  // constructor(){
  //  super():
  //  this.state = { loading: true };
  // }

  // This is shortcut way of assiging default value to state
  // without constructor
  state = { loading: true, showModal: false };

  // This works like useEffect takes action after the render of DOM
  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();

    // Long more Described method
    // const pets = json.pets[0];
    // this.setState({
    //   loading: false,
    //   animal: pets.animal,
    //   breed: pets.breed,
    //   city: pets.city,
    //   state: pets.state,
    //   description: pets.description,
    //   name: pets.name,
    //   images: pets.images,
    // });

    // managing state manually and assigning parameters to state
    // shortcut method
    this.setState(
      Object.assign(
        {
          loading: false,
        },
        json.pets[0]
      )
    );
  }

  // toggleModal to toggle on or off the modal
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location = "http://bit.ly/pet-adopt");

  // Runs everytime hook is called rendered
  render() {
    if (this.state.loading) {
      return <h2>loading ...</h2>;
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
          {/* Context used in class componenet */}
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {/* If the showModal flag is set true then Modal componenet is called or not */}
          {showModal ? (
            // The elements inside Modal will be passed as parameters
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    // Error Boundary reacts to every child components inside it
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
