import {
  Button,
  HStack,
  VStack,
  Input,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  useToast,
} from '@chakra-ui/react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { FormEventHandler, useRef, useState } from 'react';

import { ReadingStatus } from '../../model/Review';
import { RevisionPayload } from '../../model/Revision';
import ToastEditor, { EditorRef } from '../Editor';

interface Props {
  currentRevision?: RevisionPayload;
  // onTemporarySave: (editedRevision: EditableRevisionParts) => Promise<void>;
  onSave: (editedRevision: RevisionPayload) => Promise<void>;
}

enum Submitter {
  TemporarySave = 'temporary-save',
  Save = 'save',
}

enum FormName {
  Title = 'title',
  ReadingStatus = 'readingStatus',
  Stars = 'stars',
}

export default function RevisionEditor({
  currentRevision = {
    title: '',
    body: '',
    stars: 2,
    readingStatus: ReadingStatus.finishedReading,
  },
  // onTemporarySave,
  onSave,
}: Props) {
  const toast = useToast();
  const editorRef = useRef<EditorRef | null>(null);
  const [pendingSubmitter, setPendingSubmitter] = useState<Submitter | null>(
    null
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get(FormName.Title) as string;
    const body = editorRef.current?.getMarkdown() ?? '';
    const stars = parseInt(formData.get(FormName.Stars) as string, 10);
    const readingStatus = formData.get(FormName.ReadingStatus) as ReadingStatus;

    const payload = {
      title,
      body,
      stars,
      readingStatus,
    };

    if (title === '') {
      toast({
        title: '제목을 입력해주세요.',
        status: 'error',
      });
      return;
    }

    if (body === '') {
      toast({
        title: '내용을 입력해주세요.',
        status: 'error',
      });
      return;
    }

    try {
      // if (
      //   (e.nativeEvent as SubmitEvent).submitter?.id === Submitter.TemporarySave
      // ) {
      //   setPendingSubmitter(Submitter.TemporarySave);
      //   await onTemporarySave(payload);
      // } else {
      setPendingSubmitter(Submitter.Save);
      await onSave(payload);
      // }
    } finally {
      setPendingSubmitter(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing="32px" align="stretch">
        <VStack spacing="16px" align="stretch">
          <FormControl>
            <FormLabel htmlFor={FormName.Title}>제목</FormLabel>
            <Input
              defaultValue={currentRevision.title}
              id={FormName.Title}
              name={FormName.Title}
            />
          </FormControl>
          <FormControl>
            <FormLabel>내용</FormLabel>
            <ToastEditor
              registerEditor={(editor) => {
                editorRef.current = editor;
              }}
              initialValue={currentRevision.body}
              language="ko-KR"
              minHeight="600px"
              height="600px"
              hideModeSwitch
              toolbarItems={[
                ['heading', 'bold', 'italic', 'strike'],
                ['hr', 'quote'],
                ['ul', 'ol'],
                [
                  // 'table', 'image',
                  'link',
                ],
                ['code', 'codeblock'],
                ['scrollSync'],
              ]}
            />
          </FormControl>
          <HStack spacing={4}>
            <FormControl>
              <FormLabel>
                <FormLabel htmlFor={FormName.ReadingStatus}>
                  독서 상태
                </FormLabel>
                <RadioGroup
                  id={FormName.ReadingStatus}
                  name={FormName.ReadingStatus}
                  defaultValue={currentRevision.readingStatus}
                >
                  <HStack spacing={4}>
                    <Radio value={ReadingStatus.finishedReading}>읽음</Radio>
                    <Radio value={ReadingStatus.reading}>읽는 중</Radio>
                  </HStack>
                </RadioGroup>
              </FormLabel>
            </FormControl>
            <FormControl>
              <FormLabel>
                <FormLabel htmlFor={FormName.Stars}>평가</FormLabel>
                <RadioGroup
                  id={FormName.Stars}
                  name={FormName.Stars}
                  defaultValue={`${currentRevision.stars}`}
                >
                  <HStack spacing={4}>
                    <Radio value="3">추천</Radio>
                    <Radio value="2">보통</Radio>
                    <Radio value="1">별로</Radio>
                  </HStack>
                </RadioGroup>
              </FormLabel>
            </FormControl>
          </HStack>
        </VStack>
        <HStack align="center" justify="flex-end" spacing="24px">
          {/* <Button
            type="submit"
            id={Submitter.TemporarySave}
            variant="ghost"
            isLoading={pendingSubmitter === Submitter.TemporarySave}
            isDisabled={pendingSubmitter === Submitter.Save}
          >
            임시 저장
          </Button> */}
          <Button
            type="submit"
            id={Submitter.Save}
            isDisabled={pendingSubmitter === Submitter.TemporarySave}
            isLoading={pendingSubmitter === Submitter.Save}
          >
            작성하기
          </Button>
        </HStack>
      </VStack>
    </form>
  );
}
