interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: number;
}

class InMemoryStore {
  private comments: Comment[] = [];

  addComment(author: string, content: string): Comment {
    const comment: Comment = {
      id: Math.random().toString(36).substring(7),
      author,
      content,
      timestamp: Date.now(),
    };
    this.comments.push(comment);
    return comment;
  }

  getComments(): Comment[] {
    return this.comments;
  }

  clearComments(): void {
    this.comments = [];
  }
}

export const store = new InMemoryStore();
