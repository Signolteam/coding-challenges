import lambdaTester from "lambda-tester";
import { find, createMany, update } from "../app/handler";

describe("Find [GET]", () => {
  it("success", async () => {
    return lambdaTester(find)
      .event({})
      .expectResult((result: any) => {
        expect(result.statusCode).toEqual(200);
        const body = JSON.parse(result.body);
        expect(body.code).toEqual(200);
      });
  });
});

describe("CreateMany [POST]", () => {
  it("success", () => {
    return lambdaTester(createMany)
      .event({
        body: JSON.stringify({
          create: [
            {
              task_owner: "Carson Postman",
              email: "clandman0@cyberchimps.com",
              company_name: "Roodel",
              task_date: "2022-07-17",
              task_description:
                "lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit",
              task_status: "IN_REVIEW",
            },
          ],
        }),
      })
      .expectResult((result: any) => {
        expect(result.statusCode).toEqual(200);
        const body = JSON.parse(result.body);
        expect(body.code).toEqual(200);
      });
  });

  it("error", () => {
    return lambdaTester(createMany)
      .event({
        body: JSON.stringify({
          name: "Node.js：来一打 C++ 扩展",
          id: 30247892,
        }),
      })
      .expectResult((result: any) => {
        expect(result.statusCode).toEqual(500);
        //const body = JSON.parse(result.body);
      });
  });
});

describe("Update [PUT]", () => {
  it("success", () => {
    return lambdaTester(update)
      .event({
        pathParameters: { id: 30247892 },
        body: JSON.stringify({
          status: "APPROVED",
        }),
      })
      .expectResult((result: any) => {
        expect(result.statusCode).toEqual(200);
        const body = JSON.parse(result.body);
        expect(body.code).toEqual(200);
      });
  });

  it("error", () => {
    return lambdaTester(update)
      .event({
        pathParameters: { id: "30247892_" },
        body: JSON.stringify({
          status: "扩展开发知识",
        }),
      })
      .expectResult((result: any) => {
        expect(result.statusCode).toEqual(200);
        const body = JSON.parse(result.body);
        expect(body.code).toEqual(1000);
      });
  });
});
