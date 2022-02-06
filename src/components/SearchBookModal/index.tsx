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
  ModalFooter,
  HStack,
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import useSelectedBook from '../../hooks/useSelectedBook';
import { useBooks } from '../../queries/book';
import { useCreateReviewWithoutRevision } from '../../queries/review';
import SearchBookListItem from './SearchBookListItem';

type Props = Omit<ModalProps, 'children'>;

export default function SearchBookModal({ onClose, ...props }: Props) {
  const [rawKeyword, setRawKeyword] = useState('');
  const [keyword] = useDebounce(rawKeyword, 1000);
  const { data, isLoading } = useBooks({ keyword });
  const books = data?.pages.flat() ?? [];

  const [selectedBookIsbn, setSelectedBookIsbn] = useState<string | null>(null);
  const selectedBookPayload = books.find(
    (book) => book.isbn === selectedBookIsbn
  );

  const { push } = useRouter();

  const { updateState } = useSelectedBook();

  const { mutate: createUnreadReview, isLoading: isCreatingUnreadReview } =
    useCreateReviewWithoutRevision({
      onSuccess: ({ review }) => {
        updateState({ bookPayload: review.book });
        push(`/review/${review.id}`);
      },
    });

  const handleCreateReviewWithoutRevision = () => {
    if (selectedBookPayload == null) {
      return;
    }

    createUnreadReview({ bookPayload: selectedBookPayload });
  };

  const handleMoveToWriteReview = () => {
    if (selectedBookPayload == null) {
      return;
    }

    updateState({ bookPayload: selectedBookPayload });
    push(`/review/new`);
  };

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
        {books.map((book) => {
          const isSelected = book.isbn === selectedBookIsbn;
          return (
            <SearchBookListItem
              key={book.isbn}
              book={book}
              isSelected={isSelected}
              onClick={() => {
                if (isSelected) {
                  setSelectedBookIsbn(null);
                } else {
                  setSelectedBookIsbn(book.isbn);
                }
              }}
            />
          );
        })}
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
      <ModalContent position="relative" overflow="hidden">
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
        <ModalFooter
          position="absolute"
          left="0"
          bottom="0"
          width="100%"
          transition="transform 0.15s ease-in-out, opacity 0.15s ease-in-out"
          transform={selectedBookPayload != null ? 'none' : 'translateY(100%)'}
          opacity={selectedBookPayload != null ? 1 : 0}
          backgroundColor="#fefefe"
          borderTopColor="gray.200"
          borderTopWidth="1px"
          borderTopStyle="solid"
        >
          <HStack align="center" spacing="12px">
            <Button
              variant="outline"
              backgroundColor="white"
              isLoading={isCreatingUnreadReview}
              onClick={handleCreateReviewWithoutRevision}
            >
              책만 추가하기
            </Button>
            <Button
              variant="outline"
              backgroundColor="white"
              isLoading={isCreatingUnreadReview}
              onClick={handleMoveToWriteReview}
            >
              바로 독후감 쓰기
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
