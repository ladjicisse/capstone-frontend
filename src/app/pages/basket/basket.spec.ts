// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { Basket } from './basket';
// import { BasketStore } from '../../store/basket.store';
// import { SearchService } from '../../services/search.service';
// import { Router, ActivatedRoute, ParamMap, UrlTree } from '@angular/router';
// import { signal } from '@angular/core';
// import { CurrencyPipe, CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { BasketPipe } from '../../pipes/basket.pipe';
// import { RouterTestingModule } from '@angular/router/testing';
// import { of } from 'rxjs';
//
// // A more complete mock for ActivatedRoute (still necessary for 'root' property)
// const createMockActivatedRoute = (initialParams: { [key: string]: string } = {}) => {
//   const paramMap = new Map<string, string>();
//   for (const key in initialParams) {
//     if (initialParams.hasOwnProperty(key)) {
//       paramMap.set(key, initialParams[key]);
//     }
//   }
//
//   return {
//     snapshot: {
//       paramMap: {
//         get: (key: string) => paramMap.get(key),
//         has: (key: string) => paramMap.has(key),
//         keys: Array.from(paramMap.keys()),
//       } as ParamMap,
//       queryParamMap: {
//         get: (key: string) => null,
//         has: (key: string) => false,
//         keys: [],
//       },// as ParamMap,
//       params: initialParams,
//       queryParams: {},
//       fragment: null,
//       url: [],
//       data: {},
//       outlet: 'primary',
//       component: null,
//       routeConfig: null,
//       parent: null,
//       firstChild: null,
//       children: [],
//       pathFromRoot: [],
//     },
//     paramMap: of(paramMap),
//     params: of(initialParams),
//     queryParams: of({}),
//     fragment: of(''),
//     data: of({}),
//     url: of([]),
//     root: {
//       snapshot: {
//         paramMap: { get: () => null, has: () => false, keys: [] },// as ParamMap,
//         queryParams: {},
//         fragment: null,
//         url: [],
//         data: {},
//         outlet: 'primary',
//         component: null,
//         routeConfig: null,
//         parent: null,
//         firstChild: null,
//         children: [],
//         pathFromRoot: [],
//       }
//     },
//     parent: null,
//     firstChild: null,
//     children: [],
//     pathFromRoot: [],
//   };
// };
//
// describe('Basket', () => {
//   let component: Basket;
//   let fixture: ComponentFixture<Basket>;
//   let mockBasketStore: Partial<BasketStore>;
//   let mockSearchService: Partial<SearchService>;
//   let mockRouter: Partial<Router>;
//   let mockActivatedRoute: Partial<ActivatedRoute|any>;
//
//   beforeEach(async () => {
//     mockBasketStore = {
//       items: signal([]),
//       totalAmount: signal(0),
//       updateQuantity: jasmine.createSpy('updateQuantity'),
//       remove: jasmine.createSpy('remove'),
//       clear: jasmine.createSpy('clear'),
//     };
//
//     mockSearchService = {
//       query: signal(''),
//     };
//
//     mockRouter = {
//       navigate: jasmine.createSpy('navigate'),
//       createUrlTree: jasmine.createSpy('createUrlTree').and.returnValue({} as UrlTree),
//       serializeUrl: jasmine.createSpy('serializeUrl').and.returnValue(''), // ADD THIS LINE
//       url: '/',
//     };
//
//     mockActivatedRoute = createMockActivatedRoute();
//
//     await TestBed.configureTestingModule({
//       imports: [
//         Basket,
//         FormsModule,
//         CommonModule,
//         BasketPipe,
//         RouterTestingModule.withRoutes([
//           { path: '', component: Basket },
//           { path: 'products/:id', component: Basket },
//         ]),
//       ],
//       providers: [
//         { provide: BasketStore, useValue: mockBasketStore },
//         { provide: SearchService, useValue: mockSearchService },
//         { provide: ActivatedRoute, useValue: mockActivatedRoute },
//         { provide: Router, useValue: mockRouter }
//       ],
//     }).compileComponents();
//
//     fixture = TestBed.createComponent(Basket);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should display basket items and total amount', () => {
//     const testItems = [
//       { id: 1, name: 'Product A', price: 10, quantity: 2 },
//       { id: 2, name: 'Product B', price: 5, quantity: 1 },
//     ];
//     (mockBasketStore.items as any).set(testItems);
//     (mockBasketStore.totalAmount as any).set(25);
//
//     fixture.detectChanges();
//     // DOM assertions would go here
//   });
//
//   it('should call updateQuantity with increased quantity when increaseQty is called', () => {
//     const testItems = [{ id: 1, name: 'Product A', price: 10, quantity: 2 }];
//     (mockBasketStore.items as any).set(testItems);
//     fixture.detectChanges();
//
//     component.increaseQty(0);
//     expect(mockBasketStore.updateQuantity).toHaveBeenCalledWith(0, 3);
//   });
//
//   it('should call updateQuantity with decreased quantity when decreaseQty is called for quantity > 1', () => {
//     const testItems = [{ id: 1, name: 'Product A', price: 10, quantity: 2 }];
//     (mockBasketStore.items as any).set(testItems);
//     fixture.detectChanges();
//
//     component.decreaseQty(0);
//     expect(mockBasketStore.updateQuantity).toHaveBeenCalledWith(0, 1);
//   });
//
//   it('should not call updateQuantity when decreaseQty is called for quantity = 1', () => {
//     const testItems = [{ id: 1, name: 'Product A', price: 10, quantity: 1 }];
//     (mockBasketStore.items as any).set(testItems);
//     fixture.detectChanges();
//
//     component.decreaseQty(0);
//     expect(mockBasketStore.updateQuantity).not.toHaveBeenCalled();
//   });
//
//   it('should call updateQuantity with the new value when updateQty is called', () => {
//     const testItems = [{ id: 1, name: 'Product A', price: 10, quantity: 2 }];
//     (mockBasketStore.items as any).set(testItems);
//     fixture.detectChanges();
//
//     component.updateQty(0, 5);
//     expect(mockBasketStore.updateQuantity).toHaveBeenCalledWith(0, 5);
//   });
//
//   it('should call updateQuantity with 1 if updateQty is called with value less than 1', () => {
//     const testItems = [{ id: 1, name: 'Product A', price: 10, quantity: 2 }];
//     (mockBasketStore.items as any).set(testItems);
//     fixture.detectChanges();
//
//     component.updateQty(0, -3);
//     expect(mockBasketStore.updateQuantity).toHaveBeenCalledWith(0, 1);
//   });
//
//   it('should call remove when removeItem is called', () => {
//     component.removeItem(0);
//     expect(mockBasketStore.remove).toHaveBeenCalledWith(0);
//   });
//
//   it('should call clear when removeAllItems is called', () => {
//     component.removeAllItems();
//     expect(mockBasketStore.clear).toHaveBeenCalled();
//   });
//
//   it('should navigate to the home page when goBack is called', () => {
//     component.goBack();
//     expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
//   });
//
//   it('should navigate to product detail when goToDetail is called', () => {
//     const productId = 123;
//     spyOn(console, 'log');
//     component.goToDetail(productId);
//     expect(console.log).toHaveBeenCalledWith('Navigating to product detail for ID:', productId);
//     expect(mockRouter.navigate).toHaveBeenCalledWith(['/products', productId]);
//   });
//
//   it('should show an alert when payNow is called', () => {
//     spyOn(window, 'alert');
//     component.payNow();
//     expect(window.alert).toHaveBeenCalledWith('Payment process not implemented yet 🚀');
//   });
//
//   it('should display the search term', () => {
//     (mockSearchService.query as any).set('test query');
//     fixture.detectChanges();
//     expect(component.searchTerm()).toBe('test query');
//   });
// });
