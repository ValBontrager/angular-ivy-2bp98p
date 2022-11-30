import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
}

// This is an example of a High Order function (from Iain)

interface Post {
  id: number;
  title: string;
}

// API service 1
// Only Deal with Posts
const getPosts = async (): Promise<Post[]> => {
  const result = await fetch('https://jsonplaceholder.typicode.com/posts');
  const json = await result.json();
  const arr = json as unknown as Post[];
  return arr;
};

// API service 2
const getPost = async (): Promise<Post> => {
  const result = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const json = result.json();
  return json as unknown as Post;
};

const postToFormBuilderObject = (post: Post): FormBuilderObject => {
  return {
    id: post.id,
  };
};

// Adapter
const postsToFormBuilderObject = (posts: Post[]): FormBuilderObject => {
  return {
    id: postToFormBuilderObject(posts[2]).id,
  };
};

interface FormBuilderObject {
  id: number;
}

const timedExamComponent = async (): Promise<FormBuilderObject> => {
  const result = await getPosts();
  return postsToFormBuilderObject(result);
};

const scoringResultsComponent = async (): Promise<FormBuilderObject> => {
  const result = await getPost();
  return postToFormBuilderObject(result);
};

const formBuilder = async (fn: () => Promise<FormBuilderObject>) => {
  const result: FormBuilderObject = await fn();

  // form builders logic
  console.log('here is the ID', result.id);
  // create a form
  // emit a form
};

// runner wrapper
(async () => {
  await formBuilder(scoringResultsComponent);
})();
