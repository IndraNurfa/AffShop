import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

const ProductCard = ({ products }) => {
  return (
    <>
      {products?.map(product => (
        <Box
          borderWidth="1px"
          borderRadius="md"
          overflow="hidden"
          w="300px"
          onClick={() => window.open(product.link, '_blank')}
        >
          <Image src={product.image} alt={product.title} w="300px" />

          <Box p="4">
            <Text fontSize="lg" fontWeight="semibold">
              {product.title}
            </Text>
            <Text mt="2" color="gray.600">
              Rp. {product.price}
            </Text>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default ProductCard;
