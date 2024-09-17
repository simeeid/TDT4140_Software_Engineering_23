import { StarSlider } from '../../atoms/StarSlider/StarSlider';
import { 
    Card,
    CardHeader,
    VStack,
    HStack,
    Button,
    Text,
    Flex,
    Heading,
    Textarea,
 } from '@chakra-ui/react';

interface AddReviewProps {
    initialReview: number;
}

export const AddReview: React.FC<AddReviewProps> = ({ initialReview }) => {
    return (
        <Card width='1500px' height='830px'>
            <VStack>
                <Flex width='98%'>
                    <CardHeader>
                        <Heading size='md'> Add Review </Heading>
                    </CardHeader>
                    <Text
                      position="absolute"
                      top="10px"
                      right="20px"
                      color="blackAlpha.500"
                      fontWeight="bold"
                      cursor="pointer"
                      _hover={{
                        color: "gray.500",
                      }}
                    >
                      X
                    </Text>
                </Flex>
                    <Flex width='98%' justifyContent="center" height='572px'>
                        <Textarea paddingTop="10px" height={'572px'}/>
                    </Flex>
                <Flex width='98%' justifyContent='flex-end'>
                    <StarSlider initialReview={initialReview} />

                    <Button
                    marginLeft='71%'
                    variant="outline"
                    colorScheme="teal"
                    borderRadius="lg"
                    >
                    Cancel
                    </Button>

                    <Button
                    marginLeft='1%'
                    variant="solid"
                    colorScheme="teal"
                    borderRadius="lg"
                    w="150px"
                    >
                    Upload
                    </Button>
                </Flex>
            </VStack>
        </Card>
    );
};