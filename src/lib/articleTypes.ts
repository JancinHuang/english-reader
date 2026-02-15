export type VocabItem = {
  word: string;
  phonetic: string;
  cn: string;
};

export type ArticleParagraph = {
  id: number;
  en: string;
  cn: string;
};

export type QuizOption = {
  id: string;
  text: string;
};

export type QuizQuestion = {
  id: number;
  question: string;
  options: QuizOption[];
  correctId: string;
  analysis: string;
};

export type Article = {
  id: string;
  title: string;
  tags: string[];
  vocab: VocabItem[];
  content: ArticleParagraph[];
  quiz: QuizQuestion[];
};

export type ArticleListItem = {
  id: string;
  title: string;
  tags: string[];
  paragraphCount: number;
  quizCount: number;
};
