export default function realDate(date) {
  return Math.floor((new Date() - new Date(date).getTime()) / 3.15576e10);
}
