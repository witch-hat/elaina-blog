import 'mongoose';

declare module 'mongoose' {
  namespace Schema {
    namespace Types {
      class PostType extends SchemaType {}
    }
  }
}
