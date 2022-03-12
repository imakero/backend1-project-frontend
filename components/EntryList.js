import Entry from "./Entry"

const EntryList = ({ entries }) => {
  return entries.map((entry) => (
    <Entry key={entry._id} entry={entry} user={entry.author} />
  ))
}

export default EntryList
