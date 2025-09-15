"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function TestUIPage() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="container mx-auto p-8 space-y-8">
      {/* Theme Toggle */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">미소핀 CMS UI 테스트</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>

      {/* Card Example */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>카드 컴포넌트</CardTitle>
          <CardDescription>미소핀 브랜드 컬러가 적용된 카드입니다</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" placeholder="admin@misopin.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">메시지</Label>
            <Textarea id="message" placeholder="메시지를 입력하세요..." />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">취소</Button>
          <Button className="bg-[#38b0c9] hover:bg-[#2a8599]">저장</Button>
        </CardFooter>
      </Card>

      {/* Button Variants */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">버튼 스타일</h2>
        <div className="flex gap-4 flex-wrap">
          <Button>기본 버튼</Button>
          <Button variant="secondary">보조 버튼</Button>
          <Button variant="destructive">삭제</Button>
          <Button variant="outline">아웃라인</Button>
          <Button variant="ghost">고스트</Button>
          <Button variant="link">링크</Button>
          <Button className="bg-[#38b0c9] hover:bg-[#2a8599]">미소핀 Primary</Button>
          <Button className="bg-[#9F988C] hover:bg-[#6b5d4f]">미소핀 Brown</Button>
        </div>
      </div>

      {/* Dialog Example */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">다이얼로그</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>다이얼로그 열기</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>확인이 필요합니다</DialogTitle>
              <DialogDescription>
                이 작업을 계속 진행하시겠습니까? 이 작업은 되돌릴 수 없습니다.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setOpen(false)}>확인</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Dropdown Menu Example */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">드롭다운 메뉴</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">메뉴 열기</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>내 계정</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>프로필</DropdownMenuItem>
            <DropdownMenuItem>설정</DropdownMenuItem>
            <DropdownMenuItem>팀</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">로그아웃</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table Example */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">테이블</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>예약번호</TableHead>
              <TableHead>고객명</TableHead>
              <TableHead>전화번호</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="text-right">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">RES001</TableCell>
              <TableCell>홍길동</TableCell>
              <TableCell>010-1234-5678</TableCell>
              <TableCell>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                  확정
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="outline">
                  상세보기
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">RES002</TableCell>
              <TableCell>김철수</TableCell>
              <TableCell>010-9876-5432</TableCell>
              <TableCell>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-xs">
                  대기
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="outline">
                  상세보기
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}