import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";


export async function GET(req: NextRequest, { params }: { params: { blogid: string } }) {
    const blogid = params.blogid;

    try {
        const blog = await prisma.blog.findUnique({
            where: {
                id: blogid,
            },
        });

        return NextResponse.json(
            { success: true, message: blog },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: `Error while fetching blog: ${error}` },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest, { params }: { params: { blogid: string } }) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const blogid = params.blogid;
        const { title, content, image_public_id } = await req.json();

        const updatedBlog = await prisma.blog.update({
            where: {
                id: blogid,
            },
            data: {
                title,
                content,
                image_public_id,
            },
        });

        return NextResponse.json(
            { success: true, message: 'Blog updated successfully', blog: updatedBlog },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: `Error while updating blog: ${error}` },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { blogid: string } }) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const blogid = params.blogid;

        await prisma.blog.delete({
            where: {
                id: blogid,
            },
        });

        return NextResponse.json(
            { success: true, message: 'Blog deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: `Error while deleting blog: ${error}` },
            { status: 500 }
        );
    }
}
