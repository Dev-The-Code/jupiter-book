import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // Import cookies helper

async function getAddressList(searchData: string) {
  const getAddressUrl = 'https://westrideapp.com/includes/ajax/_booking2.php';
  const postData = {
    method: "get_address",
    params: {
      type: "address",
      search: searchData
    }
  };

  console.log('postData => ', postData)
  // Retrieve cookies from the request
  const cookieStore = await cookies();
  const phpSessionId = cookieStore.getAll(); // Replace "PHPSESSID" with the actual cookie name

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `PHPSESSID=${phpSessionId}`
    },
    body: JSON.stringify(postData)
  };
  try {
    const response = await fetch(getAddressUrl, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log("data => ", data)
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};

export async function POST(request: Request) {
  const { searchData } = await request.json();
  try {
    const addressList = await getAddressList(searchData);

    NextResponse.json(addressList, {status: 200});
  } catch (error) {
    console.error('Error fetching address list:', error);
    return NextResponse.json({ error: 'Failed to fetch address list' }, { status: 500 });
  }
}