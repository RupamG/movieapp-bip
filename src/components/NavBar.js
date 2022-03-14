import React from "react";
import "../App.css";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
const NavBar = ({
  filterByYearHandler,
  searchMovie,
  changeHandler,
  query,
  releaseDates,
}) => {
  const rlDates = [...new Set(releaseDates)];
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand className="nav-brand" href="/movieapp-bip/">
            Movies App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>

          <Navbar.Collapse id="nabarScroll">
            <Nav
              className="me-auto my-2 my-lg-3"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Form className="d-flex mx-2 filter">
              <Form.Select
                onChange={filterByYearHandler}
                aria-label="Default select example"
              >
                <option>Filter movies by year</option>
                {rlDates.map((rd) => (
                  <option value={rd}>{rd}</option>
                ))}
              </Form.Select>
            </Form>
            <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
              <FormControl
                type="search"
                placeholder="Search a movie"
                className="me-2"
                aria-label="search"
                name="query"
                value={query}
                onChange={changeHandler}
              ></FormControl>
              <Button variant="success" type="submit">
                search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
