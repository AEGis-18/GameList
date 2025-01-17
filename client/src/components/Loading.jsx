export default function Loading({ loading }) {
  if (loading) {
    return <h3>loading...</h3>;
  } else {
    return <></>;
  }
}
