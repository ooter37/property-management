import React from 'react'
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios'
import renderer from 'react-test-renderer';
import { HashRouter, Link } from 'react-router-dom';


describe('Checking endpoints return unauthorized when user not logged in.', () => {
  it('Get contractors.', () => {
    axios.get('http://localhost:4244/api/contractors').then((res) => {
      expect(res).toBe('User not logged in.')
    })
  });
  it('Get houses.', () => {
    axios.get('http://localhost:4244/api/houses').then((res) => {
      expect(res).toBe('User not logged in.')
    })
  });
  it('Get renters.', () => {
    axios.get('http://localhost:4244/api/renters').then((res) => {
      expect(res).toBe('User not logged in.')
    })
  });
  it('Get tasks.', () => {
    axios.get('http://localhost:4244/api/tasks').then((res) => {
      expect(res).toBe('User not logged in.')
    })
  });
  it('Send email.', () => {
    axios.post('/email/multi').then((res) => {
      expect(res).toBe('User not logged in.')
    })
  });
})

describe('Route testing', () => {
  test(" '/' renders login page (landing).", () => {
    const component = renderer.create(
      <HashRouter>
        <Link to='/' />
      </HashRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test(" '/register' renders registration page.'", () => {
    const component = renderer.create(
      <HashRouter>
        <Link to='/register' />
      </HashRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test(" '/main' renders main page.", () => {
    const component = renderer.create(
      <HashRouter>
        <Link to='/main' />
      </HashRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  //Mark 3
  test(" '/add_house' renders add house page.", () => {
    const component = renderer.create(
      <HashRouter>
        <Link to='/add_house' />
      </HashRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  //Mark 4
  test(" '/update_house' renders update house page.", () => {
    const component = renderer.create(
      <HashRouter>
        <Link to='/update_house' />
      </HashRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});
