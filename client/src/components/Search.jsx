import { useColorMode, Grid, GridItem, Container } from '@chakra-ui/react';
import Header from './Header';
import YouTubeCard from './YouTubeCard';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const query = queryParams.get('query');

  const { colorMode } = useColorMode();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = `/api/getThumbnails${query ? `?query=${query}` : ''}`;
    axios
      .get(url)
      .then(response => {
        setVideos(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        setLoading(false);
      });
  }, [query]);

  return (
    <>
      <Header />
      <Container mt='4'>
        Search: <b>{query}</b>
      </Container>
      <Grid
        templateColumns="repeat(5, 1fr)"
        spacing={10}
        p="auto"
        bg={colorMode === 'dark' ? '' : 'white'}
      >
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching data</p>
        ) : (
          videos.map(video => (
            <GridItem key={video._id}>
              <Link to={`/watch?videoId=${video._id}`}>
                <YouTubeCard video={video} />
              </Link>
            </GridItem>
          ))
        )}
      </Grid>
    </>
  );
};

export default Search;
