import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [githubRepos, setGithubRepos] = useState(mockRepos);
  const [githubFollowers, setGithubFollowers] = useState(mockFollowers);

  // request loading

  const [requests, setRequests] = useState(0);
  const [loading, setLoading] = useState(false);

  //error
  const [error, setError] = useState({ show: false, msg: '' });

  // search user
  const searchGithubUser = async (user) => {
    //toggle error
    toggleError();

    //set loading
    setLoading(true);

    const response = await axios(`${rootUrl}/users/${user}`).catch((err) => console.log(error));

    console.log(response);
    if (response) {
      setGithubUser(response.data);

      const { login, followers_url } = response.data;

      // ! more logic here

      await Promise.allSettled([
        // Repos
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ]).then((results) => {
        // destructure from results
        const [repos, followers] = results;
        const status = 'fulfilled';
        if (repos.status === status) {
          setGithubRepos(repos.value.data);
        }
        if (followers.status === status) {
          setGithubFollowers(followers.value.data);
        }

        //  console.log(results)
      });
    } else {
      toggleError(true, 'no user found');
    }
    checkRequests();
    setLoading(false);

    //use axios
    console.log(user);
  };

  // check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;

        setRequests(remaining);

        if (remaining === 0) {
          console.error('No requests remaining');

          toggleError(
            true,
            'sorry, you have exceeded your hourly request limit. Please wait and try again'
          );
        }
      })
      .catch((err) => console.log(err));
  };

  // error function to set error message
  function toggleError(show = false, msg = '') {
    setError({ show, msg });
  }

  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        githubRepos,
        githubFollowers,
        requests,
        error,
        searchGithubUser,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

// need to export github provider and github context

export { GithubProvider, GithubContext };
