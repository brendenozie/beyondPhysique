import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";
import { title } from "process";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // const { userEmail } = req.query;

  if (req.method === "GET") {

    // const aggregations = await prisma.hotel.aggregateRaw({
    //      pipeline: [
    //       //  { $match: { status: "registered" } },
    //       //  { $group: { _id: "$title" } }, ,document:'$$ROOT',_id:0
    //        {
    //           $project:{
    //             count : {"$size":'$views'},
    //               replaceRoot:
    //                       { newRoot:
    //                           { $mergeObjects:
    //                               [
    //                                 { 
    //                                   _id: "", 
    //                                   title:"",
    //                                   description :"",
    //                                   star :"",
    //                                   lat :"",
    //                                   location :"",
    //                                   long :"",
    //                                   price :"",
    //                                   offer :"",
    //                                   offerPrice :"",
    //                                   userEmail :"",
    //                                   cityId :"",
    //                                   createdAt :"",
    //                                   travelStyleId :"",
    //                                   img :""
    //                                 },
    //                                 "$$ROOT"
    //                               ]
    //                           }
    //                         }
    //               ,_id:0}
    //           },
    //        {$sort:{"count":-1}},
           
    //      ],
    //    });

      //  const aggregations = await prisma.hotel.aggregateRaw({
      //   pipeline: [
      //    //  { $match: { status: "registered" } },
      //    //  { $group: { _id: "$title" } }, ,document:'$$ROOT',_id:0
          // {
          //    $project:{
          //      count : {"$size":'$views'},
          //        replaceRoot:
          //                { newRoot:
          //                    { $mergeObjects:
          //                        [
          //                          { 
          //                            _id: "", 
          //                            title:"",
          //                            description :"",
          //                            star :"",
          //                            lat :"",
          //                            location :"",
          //                            long :"",
          //                            price :"",
          //                            offer :"",
          //                            offerPrice :"",
          //                            userEmail :"",
          //                            cityId :"",
          //                            createdAt :"",
          //                            travelStyleId :"",
          //                            img :"",
          //                          },
          //                          "$$ROOT"
          //                        ]
          //                    }
          //                  }
          //        ,_id:0}
          //    },
      //     {$sort:{"count":-1}},
          
      //   ],
      // });

      const hotel = await prisma.hotel.aggregateRaw({
        pipeline: [
          // { $match: { offer: "true" } },
          // { $group: { _id: "$_id",views :"views" } },
          
            {
              $lookup:
                {
                  from: "HotelImage",
                  localField: "hotelId",
                  foreignField: "id",
                  as: "img"
                }
           },
           {
            $project:{
              count : {"$size":'$likes'},
              document:'$$ROOT'
                ,_id:0,
              }
            },
            {$sort:{"count":-1}},
            // { $skip: 10 },
            // { $limit: 5 }
        ]
      })

    //    id
    // title
    // description
    // star
    // lat
    // location
    // long
    // price
    // offer
    // offerPrice
    // userEmail
    // cityId
    // createdAt
    // travelStyleId
    // img

    // let {cityId,_id,...newObject} = hotel;

    res.json({InfoResponse:{count: 1,
            next: "2",
            pages: 10,
            prev: "0"},
            results: hotel
          });

  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
