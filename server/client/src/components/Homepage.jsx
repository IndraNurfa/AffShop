import { useColorMode, Grid, GridItem } from '@chakra-ui/react';
import Header from './Header';
import YouTubeCard from './YouTubeCard';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const { colorMode } = useColorMode();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get('/api/getThumbnails')
      .then(response => {
        setVideos(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
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

export default Homepage;
