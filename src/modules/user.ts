export class User {
  id: any;
  name: String;
  role: any;
  email: String;
  private password: String;
  image: String;
  bio: String;
  createdAt: Date | null = null;
  modfiedAt: Date;

  constructor(data: any) {
    this.id = data?.id;
    this.name = data?.name;
    this.role = data?.role;
    this.email = data?.email;
    this.password = data?.password;
    this.image = data?.image;
    this.bio = data?.bio;
    if (this.createdAt == null) this.createdAt = new Date();
    this.modfiedAt = new Date();
  }
}

export class Role {
  id: any;
  name: String;
  constructor(data: any) {
    this.id = data?.id;
    this.name = data?.name;
  }
}

export const ROLE_ADMIN = 'ADMIN';
export const ROLE_USER = 'USER';
