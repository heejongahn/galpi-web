import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalProps,
  Input,
  VStack,
  Box,
  Center,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useDebounce } from 'use-debounce';
import { useState } from 'react';
import { useRouter } from 'next/router';
import useBooks from '../../queries/useBooks';
import SearchBookListItem from './SearchBookListItem';
import { useCreateReviewWithoutRevision } from '../../queries/review';

type Props = Omit<ModalProps, 'children'>;

export default function SearchBookModal({ onClose, ...props }: Props) {
  const [rawKeyword, setRawKeyword] = useState('');
  const [keyword] = useDebounce(rawKeyword, 1000);
  const { data, isLoading } = useBooks({ keyword });
  const books = data?.pages.flat() ?? [];

  const { push } = useRouter();

  const { mutate: createUnreadReview } = useCreateReviewWithoutRevision({
    onSuccess: ({ review }) => {
      push(`/review/${review.id}`);
    },
  });

  const child = isLoading ? (
    <Center width="100%" height="300px">
      <Spinner />
    </Center>
  ) : books.length === 0 ? (
    <Center width="100%" height="300px">
      <Text>검색 결과가 없습니다.</Text>
    </Center>
  ) : (
    <Box
      flex="1 1 auto"
      overflowY="scroll"
      py="16px"
      padding="16px 8px"
      margin="0 -8px"
    >
      <VStack as="ul" align="stretch" spacing="12px">
        {books.map((book) => (
          <SearchBookListItem
            key={book.isbn}
            book={book}
            onClick={() => createUnreadReview({ bookPayload: book })}
          />
        ))}
      </VStack>
    </Box>
  );
  return (
    <Modal
      onClose={() => {
        setRawKeyword('');
        onClose();
      }}
      {...props}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>책 검색</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack
            maxHeight="min(600px, 60vh)"
            alignItems="stretch"
            spacing="16px"
          >
            <Input
              flex="0 0 auto"
              placeholder="제목, 저자, 출판사 등의 키워드로 검색"
              value={rawKeyword}
              onChange={(e) => setRawKeyword(e.target.value)}
            />
            {child}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
