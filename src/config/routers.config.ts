import { DynamicModule, ForwardReference, Type } from '@nestjs/common';
import { Routes } from '@nestjs/core';
import { AuthModule } from 'src/main/auth/auth.module';
import { ChatModule } from 'src/main/chat/chat.module';
import { HeroModule } from 'src/main/hero/hero.module';

export default [
  {
    path: 'api/v1',
    children: [
      {
        path: 'hero',
        module: HeroModule,
      },
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'chat',
        module: ChatModule,
      },
    ],
  },
] as Routes;

export function destructModuleFromRoutes(
  routes: Routes = [],
): (
  | Type<any>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference<any>
)[] {
  return routes.reduce((a, b) => {
    if (Array.isArray(b.children) && b.children.length > 0)
      return [...a, ...destructModuleFromRoutes(b.children as Routes)];
    else if (!b.module) return a;

    return [...a, b.module];
  }, []);
}
