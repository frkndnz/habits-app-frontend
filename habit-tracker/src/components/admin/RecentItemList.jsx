

export const RecentItemList=({title,items=[],renderItem})=>{
    return(
         <div className="bg-white rounded-xl shadow p-5">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">{title}</h4>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500">No recent items</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md transition"
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
    );
}